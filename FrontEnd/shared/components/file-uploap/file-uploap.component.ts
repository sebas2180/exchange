import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-file-uploap',
  templateUrl: './file-uploap.component.html',
  styleUrls: ['./file-uploap.component.scss']
})
export class FileUploapComponent implements OnInit {
  public imageName : string ='';
  public image: string ='';
  @ViewChild('fileUpoader',{static: false}) fileUpoader: ElementRef<HTMLElement>;
  @Output() onFileSelect: EventEmitter<Object> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    
  }
  triggerClick() {
    let fileElement: HTMLElement = this.fileUpoader.nativeElement;
    fileElement.click();
}
  
  selectFile(event: Event) {
    const file      = (event.target as HTMLInputElement).files[0];
    this.imageName  = file.name;
    // Preview image
     if (file) {
      const reader  = new FileReader();
      reader.onload = () => {
        this.image  = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.onFileSelect.emit(file);
    }
  }


}
