export const USER_TABLE_COLUMNS = [
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  { name: 'email', label: 'Email', field: 'email', align: 'left' },
  { name: 'address', label: 'Address', field: 'address', align: 'left' },
  { name: 'phone', label: 'Phone', field: 'phone', align: 'left' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'center' }
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