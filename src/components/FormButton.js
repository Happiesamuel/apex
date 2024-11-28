import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="bg-buttonOrange" type="submit">
      {pending ? "Submitting..." : "Submit"}
    </Button>
  );
}

export default FormButton;
