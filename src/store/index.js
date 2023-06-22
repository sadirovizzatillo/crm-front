import {defineStore} from "pinia";

export const useStore = defineStore('store', {
  state: () => ({
    shopId: parseInt(localStorage.getItem('shopId')) || null,
    doctors:[
      {
        id:1,
        doctorName:"Akbarjon",
        surname:"Zokirov",
        serviceCost:200000,
        category:"Stomatolog",
        roomNumber:1,
        workTime: ["Thu Jun 22 2023 09:00:00 GMT+0500 (Uzbekistan Standard Time)", "Thu Jun 22 2023 18:00:00 GMT+0500 (Uzbekistan Standard Time)"]
      }
    ],
    patients:[],
    reports:[]
  }),
  actions: {
    createDoctor(doctor){
      this.doctors.push(doctor)
    },
    updateDoctor(doctor){
      const index = this.doctors.findIndex(d => d.id === doctor.id);
      this.doctors[index] = doctor
    },
    deleteDoctor(doctor){
      const index = this.doctors.findIndex(d => d.id === doctor.id);
      this.doctors.slice(index, 1)
    },
    createReport(report){
      this.reports.push(report)
    },
    updateReport(report){
      const index = this.reports.findIndex(r => r.id === report.id);
      this.reports[index] = report
    },
    deletePatient(patient){
      const index = this.patients.findIndex(p => p.id === patient.id);
      this.patients.slice(index, 1)
    },
    updatePatient(patient){
      const index = this.patients.findIndex(p => p.id === patient.id);
      this.patients[index] = patient
    },
    createPatients(patient){
      this.patients.push(patient)    
    }
  },
});
