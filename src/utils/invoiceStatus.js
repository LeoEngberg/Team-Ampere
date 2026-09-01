export const invoiceStatus = (invoice, today) => {
  if (invoice.status === 'Betald') {
    return 'Betald'
  }

  const dueDate = new Date(invoice.due)

  if (dueDate < today) {
    return 'Förfallen'
  }

  return 'Obetald'
}