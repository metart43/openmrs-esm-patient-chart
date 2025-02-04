import React from 'react';
import Forms from './forms.component';
import { useTranslation } from 'react-i18next';
import { useActivePatientEnrollment } from '@openmrs/esm-patient-common-lib';
import { InlineLoading } from 'carbon-components-react';

interface FormsProps {
  patientUuid: string;
  patient: fhir.Patient;
  isOffline: boolean;
}

const FormsDetailedOverView: React.FC<FormsProps> = ({ patientUuid, patient, isOffline }) => {
  const pageSize: number = 10;
  const { t } = useTranslation();
  const urlLabel: string = t('goToSummary', 'Go to Summary');
  const pageUrl: string = `$\{openmrsSpaBase}/patient/${patientUuid}/chart/summary`;
  const { activePatientEnrollment, isLoading } = useActivePatientEnrollment(patientUuid);

  return (
    <>
      {isLoading ? (
        <InlineLoading description={t('loading', 'Loading...')} />
      ) : (
        <Forms
          patientUuid={patientUuid}
          patient={patient}
          pageSize={pageSize}
          urlLabel={urlLabel}
          pageUrl={pageUrl}
          isOffline={isOffline}
          activePatientEnrollment={activePatientEnrollment}
        />
      )}
    </>
  );
};

export default FormsDetailedOverView;
