import { Accordion, AccordionItem } from "@nextui-org/react";
import React from "react";

const FAQS = [
  {
    id: 1,
    title: "¿Cuanto tiempo tardan para desarrollar la web?",
    content:
      "Depende del tipo de web y depende del negocio, pero normalmente la entrega suele ser de 1 semana como mínimo en paginas básicas y landing pages, ya si es una web mas compleja puede tardar hasta 1 mes.",
  },
  {
    id: 2,
    title: "¿Debo pagar todos los meses?",
    content:
      "No, solo pagas una vez y la web es tuya, no tienes que pagar mensualidades. Sin embargo, luego de 1 año entregada la web se necesita renovar el Dominio y el Hosting.",
  },
  {
    id: 3,
    title: "¿Debo pagar por adelantado?",
    content:
      "No, no se requiere el pago por adelantado. Se llega a un acuerdo con el cliente y se le da un plazo de 1 semana para pagar una vez que la web es entregada.",
  },
  {
    id: 4,
    title: "¿Qué pasa si no pago?",
    content:
      "Si no se paga, se procede a eliminar la Web de internet y se considera el trabajo finalizado.",
  },
  {
    id: 5,
    title: "¿Porqué necesito una web?",
    content:
      "Una web es una herramienta de marketing digital que te permite mostrar tus productos o servicios a todo el mundo. Es una forma de llegar a mas clientes y de aumentar tus ventas.",
  },
];

export function FAQAccordion() {
  return (
    <Accordion variant="splitted">
      {FAQS.map((faq) => (
        <AccordionItem
          title={faq.title}
          key={faq.id}
          aria-label={faq.title}
          className="text-white p-2 text-lg"
        >
          {faq.content}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
