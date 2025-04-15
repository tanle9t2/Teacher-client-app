
import Label from "./Label";
function Input({ ...props }) {
  return (
    <>
      <input
        defaultValue={props.valueInput}
        type={props.type}
        {...(props.register
          ? { ...props.register(props.name, props.option) }
          : null)}
        className="rounded-lg text-3xl p-4 mt-4 w-full border border-1"
        onChange={props.onChange}
      />
      {props.error && <p className="text-red-500">{props.error}</p>}
    </>
  );
}


function FormRow({ ...props }) {
  return (
    <div className="flex py-3 text-2xl content-center flex-col">
      <Label>{props?.label}</Label>
      <Input
        valueInput={props?.valueInput}
        register={props?.register}
        name={props?.name}
        type={props?.type}
        option={props?.option}
        onChange={props?.onChange}
        error={props?.error}
      />
    </div>
  );
}

export default FormRow;
