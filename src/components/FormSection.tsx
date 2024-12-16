// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FormSection({ title, children }: { title: string, children: any }) {

    return (
        <fieldset>
            <legend>
                <h2 className="border-bottom border-dark" style={{ cursor: 'pointer' }}>
                    {title}
                </h2>
            </legend>
            {children}
        </fieldset>

    )
}