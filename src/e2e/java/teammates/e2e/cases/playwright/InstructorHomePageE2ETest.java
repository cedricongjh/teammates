package teammates.e2e.cases.playwright;

import org.testng.annotations.BeforeMethod;

import teammates.common.datatransfer.DataBundle;

public class InstructorHomePageE2ETest extends BaseE2ETest {

    protected DataBundle testData;

    @BeforeMethod
    void prepareTestData() {
        testData = loadDataBundle("/InstructorStudentActivityLogsPageE2ETest.json");
        removeAndRestoreDataBundle(testData);
    }
}
