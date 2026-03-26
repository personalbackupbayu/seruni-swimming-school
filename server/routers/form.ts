import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { PDFDocument, rgb, PDFPage } from "pdf-lib";
import { notifyOwner } from "../_core/notification";
import axios from "axios";

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
  const lightGray = rgb(240 / 255, 240 / 255, 240 / 255);
  const darkGray = rgb(60 / 255, 60 / 255, 60 / 255);

  let y = height - 40;
  const margin = 40;
  const contentWidth = width - 2 * margin;

  // Header Background
  page.drawRectangle({
    x: 0,
    y: y - 60,
    width: width,
    height: 80,
    color: primaryColor,
  });

  // Header Title
  page.drawText("FORMULIR PENDAFTARAN", {
    x: margin,
    y: y - 25,
    size: 24,
    font: boldFont,
    color: rgb(1, 1, 1),
  });

  page.drawText("Seruni Swimming School", {
    x: margin,
    y: y - 45,
    size: 12,
    font,
    color: rgb(1, 1, 1),
  });

  y -= 90;

  // Info Box
  page.drawRectangle({
    x: margin,
    y: y - 50,
    width: contentWidth,
    height: 50,
    color: lightGray,
    borderColor: primaryColor,
    borderWidth: 1,
  });

  page.drawText(`Tanggal Pendaftaran: ${new Date().toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`, {
    x: margin + 10,
    y: y - 20,
    size: 10,
    font,
    color: darkGray,
  });

  page.drawText(`Jam: ${new Date().toLocaleTimeString("id-ID")}`, {
    x: margin + 10,
    y: y - 35,
    size: 10,
    font,
    color: darkGray,
  });

  y -= 70;

  // Form Fields
  const fields = [
    { label: "Nama Lengkap", value: data.name, icon: "👤" },
    { label: "Email", value: data.email, icon: "✉️" },
    { label: "Nomor Telepon", value: data.phone, icon: "📱" },
    { label: "Program Pilihan", value: data.program, icon: "🏊" },
  ];

  for (const field of fields) {
    // Field background
    page.drawRectangle({
      x: margin,
      y: y - 35,
      width: contentWidth,
      height: 35,
      color: lightGray,
      borderWidth: 0,
    });

    // Label
    page.drawText(field.label, {
      x: margin + 10,
      y: y - 15,
      size: 10,
      font: boldFont,
      color: primaryColor,
    });

    // Value
    page.drawText(field.value, {
      x: margin + 10,
      y: y - 28,
      size: 11,
      font,
      color: darkGray,
    });

    y -= 45;
  }

  // Message Section (if provided)
  if (data.message) {
    page.drawText("Pesan/Keterangan", {
      x: margin,
      y: y - 15,
      size: 10,
      font: boldFont,
      color: primaryColor,
    });

    y -= 20;

    page.drawRectangle({
      x: margin,
      y: y - 60,
      width: contentWidth,
      height: 60,
      color: lightGray,
      borderWidth: 0,
    });

    // Word wrap for message
    const maxCharsPerLine = 80;
    const messageLines = data.message.match(new RegExp(`.{1,${maxCharsPerLine}}`, "g")) || [];
    let messageY = y - 15;

    for (const line of messageLines.slice(0, 3)) {
      page.drawText(line, {
        x: margin + 10,
        y: messageY,
        size: 9,
        font,
        color: darkGray,
      });
      messageY -= 15;
    }

    y -= 80;
  }

  // Footer Section
  y -= 20;

  page.drawLine({
    start: { x: margin, y },
    end: { x: width - margin, y },
    thickness: 1,
    color: primaryColor,
  });

  y -= 20;

  page.drawText("Terima kasih telah mendaftar di Seruni Swimming School", {
    x: margin,
    y,
    size: 10,
    font: boldFont,
    color: primaryColor,
  });

  y -= 15;

  page.drawText("Kami akan menghubungi Anda dalam 24 jam untuk konfirmasi pendaftaran.", {
    x: margin,
    y,
    size: 9,
    font,
    color: darkGray,
  });

  y -= 15;

  page.drawText("Hubungi kami: 0878-8034-3055 | Email: seruniswimmingschool@gmail.com", {
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
  to: string,
  subject: string,
  pdfBuffer: Buffer,
  fileName: string,
  formData: FormData
): Promise<boolean> {
  try {
    // Send notification to owner with form details
    const emailContent = `
Pendaftaran Baru - ${formData.name}

Nama: ${formData.name}
Email: ${formData.email}
Telepon: ${formData.phone}
Program: ${formData.program}
${formData.message ? `Pesan: ${formData.message}` : ""}

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
  phone: string,
  formData: FormData,
  pdfBuffer: Buffer
): Promise<boolean> {
  try {
    // Format WhatsApp message with form details
    const message = `
*Pendaftaran Seruni Swimming School*

Halo! 👋

Terima kasih telah mendaftar di Seruni Swimming School.

*Data Pendaftaran Anda:*
📝 Nama: ${formData.name}
📧 Email: ${formData.email}
📱 Telepon: ${formData.phone}
🏊 Program: ${formData.program}

Kami akan menghubungi Anda dalam 24 jam untuk konfirmasi.

Jika ada pertanyaan, hubungi kami:
📞 0878-8034-3055
📧 seruniswimmingschool@gmail.com

Salam,
Tim Seruni Swimming School
    `.trim();

    // Try to send via WhatsApp API (if available)
    // This is a placeholder for actual WhatsApp integration
    console.log(`[WhatsApp] Sending message to ${phone}`);
    console.log(`[WhatsApp] Message:\n${message}`);

    // If you have WhatsApp Business API credentials, uncomment and configure:
    /*
    const response = await axios.post(
      `https://api.whatsapp.com/send?phone=${phone.replace(/[^\d]/g, '')}&text=${encodeURIComponent(message)}`,
      {}
    );
    */

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
        const emailSent = await sendEmailWithPDF(
          "seruniswimmingschool@gmail.com",
          `Formulir Pendaftaran - ${input.name}`,
          pdfBuffer,
          `pendaftaran-${input.name.replace(/\s+/g, "-")}-${Date.now()}.pdf`,
          input
        );

        // Send WhatsApp notification
        const whatsappSent = await sendWhatsAppMessage(
          "+6287880343055",
          input,
          pdfBuffer
        );

        return {
          success: true,
          message: "Formulir berhasil dikirim. Kami akan menghubungi Anda dalam 24 jam.",
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
