import {async, ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {CoursesCardListComponent} from './courses-card-list.component';
import {CoursesModule} from '../courses.module';
import { DebugElement } from '@angular/core';
import { setupCourses } from '../common/setup-test-data';
import { By } from '@angular/platform-browser';

describe('CoursesCardListComponent', () => {

  let component:CoursesCardListComponent; //The component to test
  let componentFixture:ComponentFixture<CoursesCardListComponent>; //This fixute is a utility-
  //- that can be used to access the component instance, native element etc

  let element:DebugElement; //Test utility for debugging elements

  beforeEach(waitForAsync(()=>
  {
      TestBed.configureTestingModule(
        {
          imports:[CoursesModule], //Since we do need CommonModule, formsModule and other relevent module to test the template-
          //- we imported entire module
          // But we should ensure that we do not add a module that might affect other components
        }).compileComponents().then(()=>
        {
          //Called when all components in this module are compiled in test environment

          componentFixture=TestBed.createComponent(CoursesCardListComponent); //Creates a component fixture utility
          component=componentFixture.componentInstance;
          element=componentFixture.debugElement; //For testing elements in the template
        })
  }))


  it("should create the component", () => {

   expect(component).toBeTruthy('Component Instance is invalid');
   
   
  });


  it("should display the course list", () => {

    component.courses=setupCourses();//Get list of courses
    componentFixture.detectChanges(); //Run change detection manually
   const courseCards=element.queryAll(By.css(".course-card")); //Get array of elements having this class 

   expect(courseCards).toBeTruthy('No Course cards was displayed');

   expect(courseCards.length).toBeGreaterThan(1,"Not enough cards to display");


  });


  it("should display the first course", () => {

    component.courses=setupCourses(); //Get static course list
    componentFixture.detectChanges(); //We need to manually trigger change detection
    const course=component.courses[0]; //Get first course from list

    const courseCard=element.query(By.css('.course-card:first-child')); //Returns the first card in the list
    const image=courseCard.query(By.css('img'));

    expect(courseCard).toBeTruthy('Cannot find the course card');

    expect(image.nativeElement.src).toEqual(course.iconUrl); //Should be equal



  });


});


