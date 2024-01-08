import {
  ContactFormSchema,
  type ContactFormType,
} from "@components/ContactForm";
import type { APIContext, APIRoute } from "astro";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { ResendSingleton } from "../../classes/Resend";

const rateLimiter = new RateLimiterMemory({
  points: 5, // Número de solicitudes permitidas
  duration: 86400, // por cada dia
});

interface RequestType extends Request {
  json: () => Promise<ContactFormType>;
}

interface Props extends APIContext {
  request: RequestType;
}

export const POST: APIRoute = async ({ request }: Props) => {
  const resend = ResendSingleton.getInstance();
  const body = await request.json();
  const clientIP = request.headers.get("X-Forwarded-For") || "";

  // Intenta consumir un punto para la IP del cliente
  try {
    await rateLimiter.consume(clientIP);
  } catch (error) {
    return new Response(JSON.stringify({ message: "Too many requests" }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Validate the body with Zod
  try {
    ContactFormSchema.parse(body);
  } catch (error) {
    return new Response(JSON.stringify({ message: "Invalid data" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Send the email
  const { email, fullname, message, phone } = body;

  resend.emails.send({
    from: "contacto@teclearla.com.ar",
    to: `${import.meta.env.RESEND_TO}`,
    subject: "Nueva consulta de Teclearla",
    html: `<p>
      <b>Nombre:</b> ${fullname}<br/>
      <b>Email:</b> ${email}<br/>
      <b>Teléfono:</b> ${phone}<br/>
      <b>Mensaje:</b> ${message}<br/>
    </p>`,
  });

  resend.emails.send({
    from: "contacto@teclearla.com.ar",
    to: `${email}`,
    subject: "Gracias por contactarte con Teclearla",
    html: `<h1>Hola, ${fullname}</h1>
    <p>Recibimos tu consulta a traves de nuestra pagina web.</p>
    <p>En breve nos comunicaremos con vos, muchas gracias.</p>
    <h2>Creamos sitios que generan futuro</h2>
    <p>Saludos, <a href="https://teclearla.com.ar">Teclearla</a></p>
  `,
  });

  return new Response(JSON.stringify({ message: "Success" }), {
    headers: { "Content-Type": "application/json" },
  });
};
