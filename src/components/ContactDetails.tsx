import { useState } from 'react';
import { ContactDetailsProps } from "../App";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export function ContactDetails({ prefix, title, note }: ContactDetailsProps) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <div className="contact-details mb-4">
            <h2 onClick={() => setIsCollapsed(!isCollapsed)} style={{ cursor: 'pointer' }}>
                <button type='button' className='btn btn-primary'>{isCollapsed ? <FaChevronDown /> : <FaChevronUp />}</button> {title}
            </h2>
            {!isCollapsed && (
                <>
                    {note && <p>{note}</p>}
                    <div className="mb-3">
                        <label className="form-label">Name:</label>
                        <input type="text" className="form-control" name={`${prefix}_name`} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Title:</label>
                        <input type="text" className="form-control" name={`${prefix}_title`} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone:</label>
                        <input type="text" className="form-control" name={`${prefix}_phone`} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input type="text" className="form-control" name={`${prefix}_email`} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Street Address:</label>
                        <input type="text" className="form-control" name={`${prefix}_street_address`} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Suite Number:</label>
                        <input type="text" className="form-control" name={`${prefix}_suite_no`} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">City:</label>
                        <input type="text" className="form-control" name={`${prefix}_city`} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Zip:</label>
                        <input type="text" className="form-control" name={`${prefix}_zip`} />
                    </div>
                </>
            )}
        </div>
    );
}
