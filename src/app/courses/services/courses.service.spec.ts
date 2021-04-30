import { TestBed } from "@angular/core/testing";
import { CoursesService } from "./courses.service"
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { Observable, Subscription } from "rxjs";
import { COURSES } from "../../../../server/db-data";

describe('Courses Service Suit',()=>
{
    let coursesService:CoursesService;
    let httpTestingController:HttpTestingController;
    beforeEach(()=>
    {
        TestBed.configureTestingModule(
            {
                imports:[HttpClientTestingModule], //Contains mock implementation of HTTPClient which our- 
                //-Courses service depends on. This will not make actual HTTP call but mock its methods-
                //-Therefore, we are required to provide a mock test data as response

                providers:[
                    CoursesService
                ]
            });

            coursesService=TestBed.inject(CoursesService); //Get the token of the service (here, constructor name is used)
            httpTestingController=TestBed.inject(HttpTestingController);

    })

    it('all methods are required to return Observable',()=>
    {
        //Test whether the methods in our service returns some kind of observable or not
        let result:any= coursesService.findAllCourses();
        expect(result).toBeInstanceOf(Observable);

        result= coursesService.findCourseById(4);
        expect(result).toBeInstanceOf(Observable);

        result= coursesService.findLessons(4);
        expect(result).toBeInstanceOf(Observable);

        result= coursesService.saveCourse(4,{});
        expect(result).toBeInstanceOf(Observable);
    });

    it('findAllCourses should retreive all courses',()=>
    {
        //Test whether it returns all courses from the intended API
        coursesService.findAllCourses().subscribe(courses=>
            {
                expect(courses).toBeTruthy('Result should not be null or undefined');
                expect(courses.length).toBeGreaterThan(0,'Result should not be blank array');
            });

        const request=httpTestingController.expectOne('/api/courses'); //Mocking a http request once-
        //- to the specified API

        expect(request.request.method).toEqual('GET',"Wrong HTTP method used"); //Checking that the tested method should-
        //- make a HTTP request with GET method

        expect(request.request.headers.get('asdsa')).toEqual('Hello');
        request.flush( //Send a mock response made with the request
            {
                payload:Object.values(COURSES) //Returns an array of all values in passed object
            }); 
    })

    afterEach(()=>
    {
        //Runs after each test
        httpTestingController.verify(); //Verify that all request made are correct according to the clause
        //Like we verify that only 1 call is made to the API specified in expectOne();
    })
})