import SettingsName from "./SettingsName";

function Setter({ title, children, content }) {
  return (
    <div className="space-y-2">
      <SettingsName>{title}:</SettingsName>
      <div className="flex justify-between items-center mx-4 text-sm">
        {content}
        {children}
      </div>
    </div>
  );
}

export default Setter;
