import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service"
import { LoggerService } from "./logger.service"

describe('Calculator Service Test Suit',()=>
{
    //In this function, we will define our test cases
    
    let calculatorService:CalculatorService;
    let loggerService:any; //Because we are faking it, so we annotate it with any

    beforeEach(()=> //Execute this function before running each spec(test cases)
    {
        loggerService=jasmine.createSpyObj('LoggerService',['log']); //Creating a fake(mock) object
        //We defined the name of the Object and the list of methods we are going to spy on


        TestBed.configureTestingModule( //Creates a testing module similar to NgModule
            {
                providers:[
                    CalculatorService, //Create actual intance
                    {
                        provide:LoggerService, //Token for LoggerService. Since constructor is unique, we pass in contructor
                        useValue:loggerService //Pass the fake service instance whenever LoggerService is called
                    }
                ]
            })

        calculatorService=TestBed.inject(CalculatorService); //Creating instance of actual service that we want to test
    })

    it('is going to add 2 numbers',()=> //it will define a test case
    {
        //In this function, we will write code to test 
     
        const result=calculatorService.add(10,21); //Calling the add method with static data

        expect(result).toBeGreaterThan(30) //Assertion on a value and what we expect from it
    })

    it('is going to substract 2 numbers',()=>{
        // const loggerService=new LoggerService(); //Actual instance of logger service

        const result=calculatorService.subtract(20,90);

        expect(loggerService.log).toHaveBeenCalledTimes(1); //Asserting the number of calls of a method up untill this point

        expect(result).toBeLessThan(0); //An assertion
    })
})