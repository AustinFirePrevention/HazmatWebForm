import { ContactDetailsProps } from "../App";
import FormSection from './FormSection';

export function ContactDetails({ prefix, title, note, required }: ContactDetailsProps) {
    return (
        <FormSection title={title}>
            <>
                {note && <p>{note}</p>}
                <div className="mb-3">
                    <label className={`form-label${required ? ' required' : ''}`}>Name:</label>
                    <input type="text" className="form-control" name={`${prefix}_name`} required={required} />
                </div>
                <div className="mb-3">
                    <label className={`form-label${required ? ' required' : ''}`}>Title:</label>
                    <input type="text" className="form-control" name={`${prefix}_title`} required={required} />
                </div>
                <div className="mb-3">
                    <label className={`form-label${required ? ' required' : ''}`}>Phone:</label>
                    <input type="text" className="form-control" name={`${prefix}_phone`} required={required} />
                </div>
                <div className="mb-3">
                    <label className={`form-label${required ? ' required' : ''}`}>Email:</label>
                    <input type="text" className="form-control" name={`${prefix}_email`} required={required} />
                </div>
            </>
        </FormSection>
    );
}
