export const validateMove = (moveForm) => {
  return {
    address: moveForm.address.length > 0,
    zip: moveForm.zip.length === 5,
    city: moveForm.city.length > 0,
    date: moveForm.date.length > 0,
    contract: moveForm.contract.length > 0,
  };
};

// const validationResult = { address: false, zip: false, city: false, moveDate: false, contract: false };
