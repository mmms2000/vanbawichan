import nodemailer from "nodemailer";

export const runtime = "nodejs";

const recipient = process.env.CONTACT_TO_EMAIL || "VANBAWICHAN2003@GMAIL.COM";

export async function POST(request) {
  try {
    const { name = "", email = "", message = "" } = await request.json();

    if (!name.trim() || !email.trim() || !message.trim()) {
      return Response.json({ error: "이름, 메일, 문의 내용을 모두 입력해주세요." }, { status: 400 });
    }

    if (message.length > 300) {
      return Response.json({ error: "문의 내용은 300자까지만 입력할 수 있습니다." }, { status: 400 });
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      return Response.json(
        { error: "메일 서버 환경변수가 아직 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: recipient,
      replyTo: email,
      subject: `Portfolio Inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        message,
      ].join("\n"),
    });

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(
      { error: error.message || "메일 전송에 실패했습니다." },
      { status: 500 }
    );
  }
}
