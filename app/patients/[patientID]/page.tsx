import { auth } from '@/auth';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { getPatientById } from '@/data/patients';
import { getTasksByPatientId } from '@/data/tasks';
import { TasksAccordion } from '@/components/taskList/TasksAccordion';

import { UserRound } from 'lucide-react';
import { Label } from '@radix-ui/react-select';

const PatientPage = async ({ params }: { params: { patientID: string } }) => {
  const session = await auth();
  const patient = await getPatientById(params.patientID);
  const patientTasks = await getTasksByPatientId(params.patientID);
  try {
    if (!patient) {
      // Handle case where patient is not found
      return (
        <div className='mx-auto max-w-md space-y-6 rounded-lg bg-sky-50 p-6 md:max-w-3xl'>
          <div>Patient not found</div>
        </div>
      );
    }
    const formatDate = (date: Date) => new Date(date).toLocaleDateString();
    const formatTime = (date: Date) => new Date(date).toLocaleTimeString();
    const tasks = patientTasks.map((patientTask) => {
      return {
        taskDetails: patientTask,
        patient: patient,
      };
    });
    const admissionDate = formatDate(patient.admissionTime);
    const admissionTime = formatTime(patient.admissionTime);
    const dateOfBirth = formatDate(patient.dateOfBirth);
    const dataLabel = (data: string, label: string | null) => (
      <div className='flex  '>
        <h1>{data}: </h1> 
        <div className=' px-1 '>
        {label}
        </div>
      </div>
    );
    return (
      <Card>
        <div className=' rounded-lg bg-sky-50 '>
          <CardHeader className='rounded-md bg-sky-500 text-white'>
            <UserRound size='52px' />

            {patient?.firstName + ' ' + patient?.lastName}
          </CardHeader>
          <div className='px-1	'>
            {dataLabel('ID', patient?.id)}
            {dataLabel('Date of Birth', dateOfBirth)}
            {dataLabel('Room Number', patient?.roomNumber)}
            {dataLabel('Unit Name', patient?.unitName)}
            {dataLabel('Admission Time', admissionTime)}
            <div className='pt-6	'>
              <TasksAccordion tasks={tasks} />
            </div>
          </div>
        </div>
      </Card>
    );
  } catch (error) {
    // Handle error
    console.error('Error fetching patient data:', error);
    return (
      <div className='mx-auto max-w-md space-y-6 rounded-lg bg-sky-50 p-6 md:max-w-3xl'>
        <div>Error fetching patient data</div>
      </div>
    );
  }
};

export default PatientPage;
