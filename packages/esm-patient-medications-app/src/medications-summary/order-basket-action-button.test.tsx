import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { launchPatientWorkspace } from '@openmrs/esm-patient-common-lib';
import * as esmFramework from '@openmrs/esm-framework/mock';
import OrderBasketActionButton from './order-basket-action-button.component';

jest.mock('@openmrs/esm-patient-common-lib', () => {
  const originalModule = jest.requireActual('@openmrs/esm-patient-common-lib');

  return {
    ...originalModule,
    launchPatientWorkspace: jest.fn(),
    useWorkspaces: jest.fn(() => {
      return { workspaces: [{ name: 'order-basket' }] };
    }),
  };
});

describe('<OrderBasketActionButton/>', () => {
  it('should display tablet view action button', () => {
    spyOn(esmFramework, 'useLayoutType').and.returnValue('tablet');
    render(<OrderBasketActionButton />);

    const orderBasketButton = screen.getByRole('button', { name: /Order Basket/i });
    expect(orderBasketButton).toBeInTheDocument();
    userEvent.click(orderBasketButton);

    expect(launchPatientWorkspace).toHaveBeenCalledWith('order-basket-workspace');
    expect(orderBasketButton).toHaveClass('active');
  });

  it('should display desktop view action button', () => {
    spyOn(esmFramework, 'useLayoutType').and.returnValue('desktop');
    render(<OrderBasketActionButton />);

    const orderBasketButton = screen.getByRole('button', { name: /Orders/i });
    expect(orderBasketButton).toBeInTheDocument();
    userEvent.click(orderBasketButton);

    expect(launchPatientWorkspace).toHaveBeenCalledWith('order-basket-workspace');
    expect(orderBasketButton).toHaveClass('active');
  });

  it('should display a count tag when orders are present on the desktop view', () => {
    spyOn(esmFramework, 'useLayoutType').and.returnValue('desktop');
    spyOn(esmFramework, 'useStore').and.returnValue({ items: [{ name: 'order-01', uuid: 'some-uuid' }] });
    render(<OrderBasketActionButton />);

    expect(screen.getByText(/orders/i)).toBeInTheDocument();
    expect(screen.getByText(/1/i)).toBeInTheDocument();
  });

  it('should display the count tag when orders are present on the tablet view', () => {
    spyOn(esmFramework, 'useLayoutType').and.returnValue('tablet');
    spyOn(esmFramework, 'useStore').and.returnValue({ items: [{ name: 'order-01', uuid: 'some-uuid' }] });
    render(<OrderBasketActionButton />);

    expect(screen.getByRole('button', { name: /1 order basket/i })).toBeInTheDocument();
  });
});
