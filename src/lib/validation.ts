export const PDF_LIMITS = {
  MAX_COUNT: 15,
  MAX_SIZE_MB: 50,
};

export const validatePDFSelection = (
  currentCount: number,
  incoming: File[]
) => {
  if (currentCount + incoming.length > PDF_LIMITS.MAX_COUNT) {
    return `Limit exceeded. You can only merge ${PDF_LIMITS.MAX_COUNT} files.`;
  }

  const tooLarge = incoming.find(
    (f) => f.size > PDF_LIMITS.MAX_SIZE_MB * 1024 * 1024
  );
  if (tooLarge) {
    return `${tooLarge.name} is larger than ${PDF_LIMITS.MAX_SIZE_MB}MB.`;
  }

  const invalidType = incoming.find((f) => f.type !== "application/pdf");
  if (invalidType) {
    return "Only PDF documents are supported.";
  }

  return null;
};
