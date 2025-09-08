import type { formUIAttributes } from "../types.declarationts";

export function FormUIComponent(params: formUIAttributes) {
  const { onSubmit, children, className } = params;
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    if (!onSubmit) return;
    e.preventDefault();
    onSubmit(e);
  };
  return (
    <form className={`${className}`} onSubmit={(e) => submitForm(e)}>
      {children}
    </form>
  );
}
