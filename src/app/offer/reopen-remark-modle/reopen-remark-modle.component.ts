import { Component, OnInit, Inject } from '@angular/core';
import { DatabaseService } from 'src/app/_services/DatabaseService';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-reopen-remark-modle',
  templateUrl: './reopen-remark-modle.component.html',
  styleUrls: ['./reopen-remark-modle.component.scss']
})
export class ReopenRemarkModleComponent implements OnInit {
  id:any;
  type:any;
  reopen:any={};
  constructor(public db: DatabaseService,  public dialog: DialogComponent,@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ReopenRemarkModleComponent>) {
    console.log(data);
    this.reopen.id=data.id;
    this.reopen.user_type=data.type;

  }
  
  ngOnInit() {
  }
  submit()
  {
    this.db.post_rqst({'id': this.reopen.id,'remark':this.reopen.remark,'user_type':this.reopen.user_type}, 'offer/reOpenCoupon')
    .subscribe(d => {
      console.log(d);
      if(d['status']=='LOWBALANCE'){
        console.log('low')
      this.dialog.error('Insufficient Balance');
      this.dialogRef.close(true);
      }
      else if(d['status']=='success'){
        this.dialog.success( 'Coupon successfully Reopened');
        this.dialogRef.close(true);
      }
     
    });
  }
  
}

