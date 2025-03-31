import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ContactDetails } from '../src/components/ContactDetails';
import { describe, it, expect, vi } from 'vitest';
import '../src/i18n.ts'

describe('ContactDetails', () => {
  it('renders without errors', () => {
    render(
        <ContactDetails
          prefix="test"
          title="Test Contact Details"
          businessPhone=""
          setBusinessPhone={() => {}}
          cellPhone=""
          setCellPhone={() => {}}
        />
    );
  });

  it('displays the correct labels and input fields', () => {
    render(
        <ContactDetails
          prefix="test"
          title="Test Contact Details"
          businessPhone=""
          setBusinessPhone={() => {}}
          cellPhone=""
          setCellPhone={() => {}}
          required={true}
        />
    );

    expect(screen.getByText('Test Contact Details')).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Phone/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cell Phone/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument()
  });

  // it('copies primary contact information when the button is clicked', () => {
  //   const mockName = 'John Doe';
  //   const mockPhone = '123-456-7890';
  //   const mockCellPhone = '987-654-3210';
  //   const mockEmail = 'test@example.com';

  //   vi.spyOn(document, 'querySelector').mockImplementation((selector) => {
  //     if (selector === 'input[name="primary_contact_name"]') {
  //       return { value: mockName } as any;
  //     }
  //     if (selector === 'input[name="primary_contact_business_phone"]') {
  //       return { value: mockPhone } as any;
  //     }
  //     if (selector === 'input[name="primary_contact_cell_phone"]') {
  //       return { value: mockCellPhone } as any;
  //     }
  //     if (selector === 'input[name="primary_contact_email"]') {
  //       return { value: mockEmail } as any;
  //     }
  //     return null;
  //   });

  //   render(
  //       <ContactDetails
  //         prefix="test"
  //         title="Test Contact Details"
  //         businessPhone=""
  //         setBusinessPhone={() => {}}
  //         cellPhone=""
  //         setCellPhone={() => {}}
  //         copyFromPrimary={true}
  //       />
  //   );

  //   const copyButton = screen.getByRole('button', { name: /copy primary contact/i });
  //   fireEvent.click(copyButton);

  //   expect((screen.getByLabelText(/Full Name/) as HTMLInputElement).value).toBe(mockName);
  //   // expect((screen.getByLabelText('Phone:') as HTMLInputElement).value).toBe(mockPhone); // Can't test phone because of InputMask
  //   expect((screen.getByLabelText(/Email/) as HTMLInputElement).value).toBe(mockEmail);

  //   vi.spyOn(document, 'querySelector').mockRestore();
  // });
});
