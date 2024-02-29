export const isValidPhoneNumber = (string) => {
  //US only phone number regex
  const phonePattern = /^(\+1)?[0-9]{3}[\s.-]?[0-9]{3}[\s.-]?[0-9]{4}$/;
  return phonePattern.test(string);
};