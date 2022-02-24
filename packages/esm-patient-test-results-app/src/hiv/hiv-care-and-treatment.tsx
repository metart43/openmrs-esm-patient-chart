import { Column, Grid, InlineLoading, Row } from 'carbon-components-react';
import React, { useContext, useEffect } from 'react';
import mockConceptTree from './mock-concept-tree';
import FilterSet from '../filter/filter-set';
import FilterContext, { FilterProvider } from '../filter/filter-context';
import usePatientResultsData from '../loadPatientTestData/usePatientResultsData';
import { usePatient, openmrsFetch } from '@openmrs/esm-framework';
import { MultiTimeline } from '../timeline/Timeline';
import { EmptyState, ErrorState } from '@openmrs/esm-patient-common-lib';
import useSWR from 'swr';

const HIVCareAndTreatment = () => {
  const { patientUuid } = usePatient();
  const { sortedObs, loaded, error } = usePatientResultsData(patientUuid);
  // const concept = '5035a431-51de-40f0-8f25-4a98762eb796'; // on openmrs-spa.org this is bloodwork
  // const { data: result } = useSWR(`/ws/rest/v1/obstree?patient=${patientUuid}&concept=${concept}`, openmrsFetch);
  // console.log('result', result);

  if (!loaded) {
    return <InlineLoading />;
  }
  if (error) {
    return <ErrorState error={error} headerTitle="Data Load Error" />;
  }
  if (loaded && !error && sortedObs && !!Object.keys(sortedObs).length) {
    return (
      <FilterProvider sortedObs={sortedObs} root={mockConceptTree}>
        <Grid>
          <Row>
            <Column sm={16} lg={4}>
              <FilterSet root={mockConceptTree} />
            </Column>
            <Column sm={16} lg={8}>
              <MultiTimeline patientUuid={patientUuid} />
            </Column>
          </Row>
        </Grid>
      </FilterProvider>
    );
  }
  if (loaded && !error && sortedObs && !Object.keys(sortedObs).length) {
    return <EmptyState displayText="observations" headerTitle="Data Timeline" />;
  }
  return null;
};

export default HIVCareAndTreatment;
