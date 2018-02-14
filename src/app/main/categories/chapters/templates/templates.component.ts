import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
  selectedTemplate: any;
  templateArray: Array<any>;

  constructor(
    private router: Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.templateArray = [
      {
        template: 'Template One',
        id: 1
      },
      {
        template: 'Template Two',
        id: 2
      },
      {
        template: 'Template Three',
        id: 3
      },
      {
        template: 'Template Four',
        id: 4
      }
    ];

  }

  onChange(): any {
    console.log(this.selectedTemplate.id);
    if(this.selectedTemplate.id) {
      this.router.navigate([`${this.selectedTemplate.id}/template`], { relativeTo: this.route })
    }
  }

}
