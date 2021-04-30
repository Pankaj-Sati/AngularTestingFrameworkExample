import {async, ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, waitForAsync} from '@angular/core/testing';
import {CoursesModule} from '../courses.module';
import {DebugElement} from '@angular/core';

import {HomeComponent} from './home.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CoursesService} from '../services/courses.service';
import {HttpClient} from '@angular/common/http';
import {COURSES} from '../../../../server/db-data';
import {setupCourses} from '../common/setup-test-data';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {click} from '../common/test-utils';
import { expand } from 'rxjs/operators';




describe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component:HomeComponent;
  let el: DebugElement;
  let coursesService:any; //We will give a fake implementattion of this service

  beforeEach(waitForAsync(() => { //waitForAsync will tell test runner that this is a async function and-
    //- to wait untill it is finished

    coursesService=jasmine.createSpyObj('CoursesService',['findAllCourses']); //Creating a spy-
    //- service and spying on its method(s)

    TestBed.configureTestingModule(
      {
        imports:[CoursesModule,//Home Component is declared in this module
        NoopAnimationsModule],
        providers:[
          {
            provide:CoursesService, //provide fake implementation of the serive whenever original is called
            useValue:coursesService
          }
        ]
      }).compileComponents().then(()=>
      {
        fixture=TestBed.createComponent(HomeComponent); //Create a ComponentFixture out of specified one
        component=fixture.componentInstance;
        el=fixture.debugElement;
      })

  }));

  it("should create the component", () => {

    expect(component).toBeTruthy();

  });


  it("should display only beginner courses", () => {

    pending();

  });


  it("should display only advanced courses", () => {

      pending();

  });


  it("should display both tabs", () => {

    pending();

  });


  it("should display advanced courses when tab clicked-Jasmine done", (fn:DoneFn) => { //DoneFn is a utility function by Jasmine to-
    //- mark a test case completed only when we call this function.
    //This implementation of callback tells jasmine that we have an async operation and not to mark this completed-
    //- after synchronous code is executed.
    // Jasmine also has a default timeout if we don't call DoneFn in that

    //Provide some data to our component's variables
    coursesService.findAllCourses.and.returnValue(of(setupCourses())); //This method returns an-
    //- observable, therefore we passed in a static data and transformed it into Observable

    fixture.detectChanges();//Trigger change detection once we have data
    

    const tabs=el.queryAll(By.css('.mat-tab-label')); //Query a DOM element using DebugElement
    expect(tabs).toBeTruthy('Cannnot get Tabs');
    expect(tabs.length).toBe(2,'Invalid number of tabs');

    //Now we are sure that we have exactly 2 tabs

    const advancedTab=tabs[1];
    expect(advancedTab.nativeElement.textContent).toContain('Advanced','Not clicking on advanced tab');
    advancedTab.nativeElement.click(); //Access the DOM API using nativeElement and call click event on this
   
    fixture.detectChanges();//Triggering manual change detection

    setTimeout(()=>{

      //A normal setTimeout would execute long after our test case ended. Since test case could'nt find any-
      //- assetions that would fail, it marked test as success but raised a console error for our async operation
     
     
      const cards=el.queryAll(By.css('.mat-tab-body-active .mat-card-title'));
      console.log({matCards:cards});
      expect(cards).toBeTruthy('Advanced cards not initialized');
      expect(cards.length).toBeGreaterThan(0,'Invalid number of advanced cards');

      //We have advanced courses cards
      const firstCardTitle=cards[0];
      expect(firstCardTitle).toBeTruthy('Cannot find title of the first advanced course');

      expect(firstCardTitle.nativeElement.textContent).toContain('Angular Security Course - Web Security Fundamentals','Not the correct advanced course card')
      
      fn();//Expiclity tell jasmine to mark this test done when we call this
    },500);
    
    

  });

  it('should display advanced courses when tab clicked-fakeasync',fakeAsync(()=>
  {
     //Provide some data to our component's variables
     coursesService.findAllCourses.and.returnValue(of(setupCourses())); //This method returns an-
     //- observable, therefore we passed in a static data and transformed it into Observable
 
     fixture.detectChanges();//Trigger change detection once we have data
     
 
     const tabs=el.queryAll(By.css('.mat-tab-label')); //Query a DOM element using DebugElement
     expect(tabs).toBeTruthy('Cannnot get Tabs');
     expect(tabs.length).toBe(2,'Invalid number of tabs');
 
     //Now we are sure that we have exactly 2 tabs
 
     const advancedTab=tabs[1];
     expect(advancedTab.nativeElement.textContent).toContain('Advanced','Not clicking on advanced tab');
     advancedTab.nativeElement.click(); //Access the DOM API using nativeElement and call click event on this
    
     fixture.detectChanges();//Triggering manual change detection
 
     flush(); //Execute all async tasks before moving forward
     const cards=el.queryAll(By.css('.mat-tab-body-active .mat-card-title'));
     console.log({matCards:cards});
     expect(cards).toBeTruthy('Advanced cards not initialized');
     expect(cards.length).toBeGreaterThan(0,'Invalid number of advanced cards');

     //We have advanced courses cards
     const firstCardTitle=cards[0];
     expect(firstCardTitle).toBeTruthy('Cannot find title of the first advanced course');

     expect(firstCardTitle.nativeElement.textContent).toContain('Angular Security Course - Web Security Fundamentals','Not the correct advanced course card')
     
  }));

});


