import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing"

describe('Async Operations Test',()=>
{
    it('Fake async zone',fakeAsync(()=>
    {
        let flag=1;
        setTimeout(()=> //fakeAsync zone will replace the async operations with a fake implimentation
        {
            flag=2;
            console.log('First Timeout');
        },2000);

        setTimeout(()=>
        {
            flag=3;
            console.log('Second Timeout');
        },3000);

        flush();

        expect(flag).toBe(3);
    }));

    it('Testing Promises',fakeAsync(()=>
    {
        console.log('Starting test');
        let flag=0;
        Promise.resolve().then(()=>
        {
            console.log('Promise is called');
            flag=1;
        });
        flushMicrotasks(); //Execute all micro-task like Promise before moving to next line
        console.log('Finishing test');
        expect(flag).toBeGreaterThan(0);
    }));
})