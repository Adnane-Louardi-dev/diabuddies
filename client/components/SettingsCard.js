export const SettingsCard = ({ sectionTitle, children }) => {
  return (
    <section>
      <h5 className={"text-lg text-diaGray font-semibold font-rubik"}>{sectionTitle}</h5>
      <div className={"bg-white rounded-md p-4"}>{children}</div>
    </section>
  );
};
