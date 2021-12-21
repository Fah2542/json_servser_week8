import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms'
import { EmployeeModels } from './employee-dashboard.model';
import { ApiService } from '../shared/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formEmployee!: FormGroup;
  employeeModel: EmployeeModels = new EmployeeModels();
  employeeData: any;
  showAdd! : boolean;
  showUpdata! : boolean

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.formEmployee = new FormGroup({

      Firstname: new FormControl(),
      LastName: new FormControl(),
      Email: new FormControl(),
      Telephone: new FormControl(),
      Salary: new FormControl()
    }),
    this.getEmployee()
  }

  postEmployee() {
    this.employeeModel.Firstname = this.formEmployee.value.Firstname
    this.employeeModel.LastName = this.formEmployee.value.LastName
    this.employeeModel.Email = this.formEmployee.value.Email
    this.employeeModel.Telephone = this.formEmployee.value.Telephone
    this.employeeModel.Salary = this.formEmployee.value.Salary
    console.log(this.formEmployee.value)
    console.log(this.employeeModel)
    this.api.postEmployee(this.employeeModel)
      .subscribe(res => {
        Swal.fire("Complete", "Add Employee Complete", "success")
        this.getEmployee()
        let close = document.getElementById("close")
        close!.click()
      },
        err => {
          Swal.fire("Error", "Add Employee Error", "error")
        })
  }
  getEmployee() {
    this.api.getEmployee()
      .subscribe(res => {
        this.employeeData = res;
      })
  }
  deleteEmployee(id: number){
    this.api.deleteEmployee(id)
      .subscribe(res => {
        Swal.fire("Complete", "Delete Employee Complete", "success")
        this.getEmployee()
      },
        err => {
          Swal.fire("Error", "Delete Employee Error", "error")
        })
  }
  clickAdd(){
    this.formEmployee.reset()
    this.showAdd = true
    this.showUpdata = false
    this.employeeData.id = 0
  }
  clickEdit(data: any){
    this.formEmployee.reset()
    this.showAdd = false
    this.showUpdata = true
    this.employeeData.id = data.id
    this.formEmployee.controls['Firstname'].setValue(data.Firstname)
    this.formEmployee.controls['LastName'].setValue(data.LastName)
    this.formEmployee.controls['Email'].setValue(data.Email)
    this.formEmployee.controls['Telephone'].setValue(data.Telephone)
    this.formEmployee.controls['Salary'].setValue(data.Salary)
  }
  UpdataEmployee(){
    this.employeeModel.Firstname = this.formEmployee.value.Firstname
    this.employeeModel.LastName = this.formEmployee.value.LastName
    this.employeeModel.Email = this.formEmployee.value.Email
    this.employeeModel.Telephone = this.formEmployee.value.Telephone
    this.employeeModel.Salary = this.formEmployee.value.Salary
    this.api.updateEmployee(this.employeeData.id, this.employeeModel)
      .subscribe(res => {
        Swal.fire("Complete", "Add Employee Complete", "success")
        this.getEmployee()
        let close = document.getElementById("close")
        close!.click()
      },
        err => {
          Swal.fire("Error", "Add Employee Error", "error")
        })
  }
  }


