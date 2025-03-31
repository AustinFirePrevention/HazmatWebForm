import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ContactDetails } from '../src/components/ContactDetails';
import { describe, it, expect } from 'vitest';
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
});
