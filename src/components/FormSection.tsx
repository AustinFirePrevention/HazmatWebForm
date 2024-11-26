import { ReactElement } from 'react';

export default function FormSection({ title, children }: { title: string, children: ReactElement }) {

    return (<div className={`${title} mb-4`}>
        <h2 style={{ cursor: 'pointer' }}>
            {title}
        </h2>
        {children}
    </div>
    )
}