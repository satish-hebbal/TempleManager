// utils/templeFormValidation.ts
import * as yup from 'yup';

// Screen 1: Deity Information Validation
export const deityInfoSchema = yup.object().shape({
  mainDeity: yup.string().required('Main deity name is required'),
  otherDeities: yup.array().of(yup.string())
  // File validation will be handled in the component
});

// Screen 2: Temple Details Validation
export const templeDetailsSchema = yup.object().shape({
  establishmentDate: yup.string().required('Date of establishment is required'),
  founderName: yup.string().required('Founder name is required'),
  managementTrust: yup.string().required('Management/Trust name is required'),
  jatraDate: yup.string(),
  priestLeaderName: yup.string().required('Priest/Leader name is required'),
  timingFrom: yup.string().required('Opening time is required'),
  timingTo: yup.string().required('Closing time is required'),
  description: yup.string()
});

// Screen 3: Location and Facilities Validation
export const locationFacilitiesSchema = yup.object().shape({
  address: yup.string().required('Address is required'),
  contactNumber: yup
    .string()
    .matches(/^\d{10}$/, 'Phone number must be 10 digits')
    .required('Contact number is required'),
  entranceFee: yup.string().oneOf(['Free', 'Free & Paid', 'Paid']).required(),
  feeAmount: yup.string().when('entranceFee', {
    is: 'Paid',
    then: schema => schema.required('Fee amount is required'),
    otherwise: schema => schema
  }),
  isParking: yup.boolean(),
  isAccommodation: yup.boolean(),
  isPhotography: yup.boolean()
});

// Screen 4: Media and Final Validation
export const mediaFinalSchema = yup.object().shape({
  website: yup.string().url('Please enter a valid URL').nullable(),
  socialMedia: yup.object().shape({
    facebook: yup.string().url('Please enter a valid Facebook URL').nullable(),
    instagram: yup.string().url('Please enter a valid Instagram URL').nullable(),
    twitter: yup.string().url('Please enter a valid Twitter URL').nullable()
  })
  // File validation will be handled in the component
});

// Max file size (10MB)
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

// Allowed file types for images
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

// File validation function
export const validateFile = (file: File, maxSize = MAX_FILE_SIZE, allowedTypes = ALLOWED_IMAGE_TYPES) => {
  if (!file) return 'File is required';
  if (file.size > maxSize) return `File size must be less than ${maxSize / (1024 * 1024)}MB`;
  if (!allowedTypes.includes(file.type)) return 'File type not supported';
  return null;
};