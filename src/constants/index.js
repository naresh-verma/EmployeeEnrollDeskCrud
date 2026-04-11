export const getUserTableColumns = (labels) => [
  { name: 'name', label: labels.columnName, field: 'name', align: 'left' },
  { name: 'email', label: labels.columnEmail, field: 'email', align: 'left' },
  { name: 'address', label: labels.columnAddress, field: 'address', align: 'left' },
  { name: 'phone', label: labels.columnPhone, field: 'phone', align: 'left' },
  { name: 'actions', label: labels.columnActions, field: 'actions', align: 'center' }
]

export const EMPTY_ROLE_FORM_DATA = {
  companyName: '',
  jobTitle: '',
  department: '',
  salary: '',
  startDate: '',
  description: ''
}

export const ROLE_REGISTRATION_STEPS = {
  FORM: 'form',
  REVIEW: 'review'
}