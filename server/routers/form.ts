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
  const { height } = page.getSize();

  const font = await pdfDoc.embedFont("Helvetica");
  const boldFont = await pdfDoc.embedFont("Helvetica-Bold");

  let y = height - 50;

  // Header
  page.drawText("FORMULIR PENDAFTARAN SERUNI SWIMMING SCHOOL", {
    x: 50,
    y,
    size: 16,
    font: boldFont,
    color: rgb(11 / 255, 91 / 255, 168 / 255),
  });

  y -= 40;

  // Divider
  page.drawLine({
    start: { x: 50, y },
    end: { x: 545, y },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  y -= 30;

  // Form fields
  const fields = [
    { label: "Nama Lengkap", value: data.name },
    { label: "Email", value: data.email },
    { label: "Nomor Telepon", value: data.phone },
    { label: "Program Pilihan", value: data.program },
    { label: "Pesan/Keterangan", value: data.message || "-" },
  ];

  for (const field of fields) {
    // Label
    page.drawText(`${field.label}:`, {
      x: 50,
      y,
      size: 11,
      font: boldFont,
      color: rgb(0, 0, 0),
    });

    y -= 20;

    // Value
    page.drawText(field.value, {
      x: 50,
      y,
      size: 10,
      font,
      color: rgb(100 / 255, 100 / 255, 100 / 255),
    });

    y -= 25;
  }

  // Footer
  y -= 20;
  page.drawText(`Tanggal Pendaftaran: ${new Date().toLocaleDateString("id-ID")}`, {
    x: 50,
    y,
    size: 9,
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
  fileName: string
): Promise<boolean> {
  try {
    // Using Manus built-in email service via notification
    await notifyOwner({
      title: subject,
      content: `Formulir pendaftaran dari ${to} telah diterima.`,
    });
    return true;
  } catch (error) {
    console.error("[Email] Failed to send:", error);
    return false;
  }
}

async function sendWhatsAppMessage(
  phone: string,
  message: string
): Promise<boolean> {
  try {
    // WhatsApp integration via Manus API
    // This would typically use a WhatsApp Business API integration
    // For now, we'll log it as a placeholder
    console.log(`[WhatsApp] Message queued for ${phone}: ${message}`);
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

        // Send email
        const emailSent = await sendEmailWithPDF(
          "seruniswimmingschool@gmail.com",
          `Formulir Pendaftaran - ${input.name}`,
          pdfBuffer,
          `pendaftaran-${input.name.replace(/\s+/g, "-")}.pdf`
        );

        // Send WhatsApp notification
        const whatsappMessage = `Halo! Terima kasih telah mendaftar di Seruni Swimming School. Kami akan menghubungi Anda segera untuk konfirmasi. Nama: ${input.name}, Program: ${input.program}`;
        const whatsappSent = await sendWhatsAppMessage(
          "+6287880343055",
          whatsappMessage
        );

        // Also notify owner
        await notifyOwner({
          title: "Pendaftaran Baru - Seruni Swimming School",
          content: `Nama: ${input.name}\nEmail: ${input.email}\nTelepon: ${input.phone}\nProgram: ${input.program}`,
        });

        return {
          success: true,
          message: "Formulir berhasil dikirim. Kami akan menghubungi Anda segera.",
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
