

export const SettingsCard = ({sectionTitle, children}) => {


    return <section>
        <h5 className={"text-xl text-gray-600 my-5"}>{sectionTitle}</h5>
        <div className={"bg-white rounded-md p-5"}>
            {children}
        </div>
    </section>
}