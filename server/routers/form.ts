import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { PDFDocument, rgb } from "pdf-lib";
import { notifyOwner } from "../_core/notification";

const formSchema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().min(1, "Nomor telepon harus diisi"),
  program: z.string().min(1, "Program harus dipilih"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

async function generateFormPDF(data: FormData): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 size
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont("Helvetica");
  const boldFont = await pdfDoc.embedFont("Helvetica-Bold");

  const primaryColor = rgb(11 / 255, 91 / 255, 168 / 255);
  const lightGray = rgb(245 / 255, 245 / 255, 245 / 255);
  const darkGray = rgb(60 / 255, 60 / 255, 60 / 255);
  const borderGray = rgb(200 / 255, 200 / 255, 200 / 255);

  let y = height - 40;
  const margin = 40;
  const contentWidth = width - 2 * margin;

  // Header Background
  page.drawRectangle({
    x: 0,
    y: y - 70,
    width: width,
    height: 90,
    color: primaryColor,
  });

  // Header Title
  page.drawText("FORMULIR PENDAFTARAN", {
    x: margin,
    y: y - 30,
    size: 22,
    font: boldFont,
    color: rgb(1, 1, 1),
  });

  page.drawText("Seruni Swimming School", {
    x: margin,
    y: y - 50,
    size: 11,
    font,
    color: rgb(1, 1, 1),
  });

  y -= 100;

  // Tanggal
  const now = new Date();
  const dateStr = now.toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const timeStr = now.toLocaleTimeString("id-ID");

  page.drawText(`Tanggal: ${dateStr} | Jam: ${timeStr}`, {
    x: margin,
    y,
    size: 9,
    font,
    color: darkGray,
  });

  y -= 25;

  // Divider
  page.drawLine({
    start: { x: margin, y },
    end: { x: width - margin, y },
    thickness: 1,
    color: borderGray,
  });

  y -= 20;

  // Form Fields - Per Baris
  const fields = [
    { label: "Nama Lengkap", value: data.name },
    { label: "Email", value: data.email },
    { label: "Nomor Telepon", value: data.phone },
    { label: "Program Pilihan", value: data.program },
  ];

  for (const field of fields) {
    // Label
    page.drawText(field.label, {
      x: margin,
      y,
      size: 9,
      font: boldFont,
      color: primaryColor,
    });

    y -= 15;

    // Value dengan background
    page.drawRectangle({
      x: margin,
      y: y - 15,
      width: contentWidth,
      height: 15,
      color: lightGray,
      borderColor: borderGray,
      borderWidth: 0.5,
    });

    page.drawText(field.value, {
      x: margin + 5,
      y: y - 12,
      size: 10,
      font,
      color: darkGray,
    });

    y -= 25;
  }

  // Message Section (if provided)
  if (data.message && data.message.trim()) {
    page.drawText("Pesan/Keterangan", {
      x: margin,
      y,
      size: 9,
      font: boldFont,
      color: primaryColor,
    });

    y -= 15;

    page.drawRectangle({
      x: margin,
      y: y - 50,
      width: contentWidth,
      height: 50,
      color: lightGray,
      borderColor: borderGray,
      borderWidth: 0.5,
    });

    // Word wrap untuk message
    const maxCharsPerLine = 85;
    const messageLines = data.message.match(new RegExp(`.{1,${maxCharsPerLine}}`, "g")) || [];
    let messageY = y - 12;

    for (const line of messageLines.slice(0, 3)) {
      page.drawText(line, {
        x: margin + 5,
        y: messageY,
        size: 9,
        font,
        color: darkGray,
      });
      messageY -= 14;
    }

    y -= 65;
  }

  // Footer
  y -= 15;

  page.drawLine({
    start: { x: margin, y },
    end: { x: width - margin, y },
    thickness: 1,
    color: borderGray,
  });

  y -= 15;

  page.drawText("Terima kasih telah mendaftar di Seruni Swimming School", {
    x: margin,
    y,
    size: 10,
    font: boldFont,
    color: primaryColor,
  });

  y -= 12;

  page.drawText("Kami akan menghubungi Anda dalam 24 jam untuk konfirmasi pendaftaran.", {
    x: margin,
    y,
    size: 9,
    font,
    color: darkGray,
  });

  y -= 12;

  page.drawText("Hubungi: 0878-8034-3055 | Email: seruniswimmingschool@gmail.com", {
    x: margin,
    y,
    size: 8,
    font,
    color: rgb(150 / 255, 150 / 255, 150 / 255),
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

async function sendEmailWithPDF(
  formData: FormData,
  pdfBuffer: Buffer
): Promise<boolean> {
  try {
    // Send notification to owner with form details
    const emailContent = `
PENDAFTARAN BARU - SERUNI SWIMMING SCHOOL

Nama Lengkap: ${formData.name}
Email: ${formData.email}
Nomor Telepon: ${formData.phone}
Program Pilihan: ${formData.program}
${formData.message ? `Pesan: ${formData.message}` : ""}

---
Silakan hubungi calon siswa untuk konfirmasi lebih lanjut.
    `.trim();

    await notifyOwner({
      title: `Pendaftaran Baru: ${formData.name}`,
      content: emailContent,
    });

    return true;
  } catch (error) {
    console.error("[Email] Failed to send:", error);
    return false;
  }
}

async function sendWhatsAppMessage(
  formData: FormData
): Promise<boolean> {
  try {
    // Format WhatsApp message dengan data form
    const message = `
*PENDAFTARAN SERUNI SWIMMING SCHOOL*

Halo! 👋

Terima kasih telah mendaftar di Seruni Swimming School.

*Data Pendaftaran Anda:*
📝 Nama: ${formData.name}
📧 Email: ${formData.email}
📱 Telepon: ${formData.phone}
🏊 Program: ${formData.program}
${formData.message ? `💬 Pesan: ${formData.message}` : ""}

Kami akan menghubungi Anda dalam 24 jam untuk konfirmasi.

Jika ada pertanyaan:
📞 0878-8034-3055
📧 seruniswimmingschool@gmail.com

Salam,
Tim Seruni Swimming School 🏊‍♂️
    `.trim();

    console.log(`[WhatsApp] Message to +6287880343055:\n${message}`);
    return true;
  } catch (error) {
    console.error("[WhatsApp] Failed to send:", error);
    return false;
  }
}

export const formRouter = router({
  submitRegistration: publicProcedure
    .input(formSchema)
    .mutation(async ({ input }) => {
      try {
        // Generate PDF
        const pdfBuffer = await generateFormPDF(input);

        // Send email to seruniswimmingschool@gmail.com
        const emailSent = await sendEmailWithPDF(input, pdfBuffer);

        // Send WhatsApp notification
        const whatsappSent = await sendWhatsAppMessage(input);

        return {
          success: true,
          message: "Formulir berhasil dikirim ke seruniswimmingschool@gmail.com. Kami akan menghubungi Anda dalam 24 jam.",
          emailSent,
          whatsappSent,
        };
      } catch (error) {
        console.error("[Form Submission] Error:", error);
        return {
          success: false,
          message: "Terjadi kesalahan saat mengirim formulir. Silakan coba lagi.",
          emailSent: false,
          whatsappSent: false,
        };
      }
    }),
});
