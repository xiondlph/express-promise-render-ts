const chai = require("chai");
const sinon = require('sinon');
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
const should = chai.should();
const expect = chai.expect;

const promiseRender = require("../index");

describe("Promise render middleware", () => {
    it("Attach promiseRender method to response object", () => {
        const res = {};
        const next = sinon.spy();

        promiseRender(
            {}, // req
            res,
            next
        );

        expect(res).to.have.property('promiseRender');
        expect(next.called).to.equal(true);
    });

    it("Call promiseRender method from response object", () => {
        const res = {
            render(view, options, callback) {
                expect(view).to.equal("path/to/template");
                expect(options).to.eql({someParam: "someValue"});
                expect(callback).to.be.a("function");

                callback(
                    null, // Rendered without errors
                    'HTML' // Rendering result
                );
            }
        };

        promiseRender(
            {}, // req
            res,
            () => {} // express next function
        );

        return res.promiseRender(
            "path/to/template",
            {someParam: "someValue"}
        ).should.eventually.equal("HTML");
    });

    it("Call promiseRender method from response object with rejection", () => {
        const renrerException = new Error("Some render exception");
        const res = {
            render(view, options, callback) {
                callback(
                    renrerException, // Some exception during render
                );
            }
        };

        promiseRender(
            {}, // req
            res,
            () => {}
        );

        return res.promiseRender(
            "path/to/template",
            {someParam: "someValue"}
        ).should.eventually.rejectedWith(Error);
    });
});