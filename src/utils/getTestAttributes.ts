export const getTestAttributes = ({
  module,
  description,
  element,
  id,
}: {
  module: string;
  description: string;
  element?: string;
  id?: string;
}):
  | {
      ["data-test-id"]: string;
    }
  | undefined => {
  const parts = [module, description, element, id].filter(Boolean);
  return { "data-test-id": parts.join("-") };
};
