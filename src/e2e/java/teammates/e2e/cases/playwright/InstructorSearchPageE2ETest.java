package teammates.e2e.cases.playwright;

import java.util.HashMap;
import java.util.Map;

import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import com.microsoft.playwright.Page;

import teammates.common.datatransfer.DataBundle;
import teammates.common.datatransfer.attributes.CourseAttributes;
import teammates.common.datatransfer.attributes.StudentAttributes;
import teammates.common.util.AppUrl;
import teammates.common.util.Const;
import teammates.e2e.cases.playwright.pages.InstructorCourseStudentDetailsEditPage;
import teammates.e2e.cases.playwright.pages.InstructorCourseStudentDetailsViewPage;
import teammates.e2e.cases.playwright.pages.InstructorSearchPage;
import teammates.e2e.cases.playwright.pages.InstructorStudentRecordsPage;
import teammates.e2e.util.TestProperties;

public class InstructorSearchPageE2ETest extends BaseE2ETest {

  protected DataBundle testData;

  @BeforeMethod
  void prepareTestData() {
    if (!TestProperties.INCLUDE_SEARCH_TESTS) {
      return;
    }

    testData = loadDataBundle("/InstructorSearchPageE2ETest.json");
    removeAndRestoreDataBundle(testData);
    putDocuments(testData);
  }

  @Test
  void testAll() {
    if (!TestProperties.INCLUDE_SEARCH_TESTS) {
      return;
    }

    String instructorId = testData.accounts.get("instructor1OfCourse1").getGoogleId();
    AppUrl searchPageUrl = createFrontendUrl(Const.WebPageURIs.INSTRUCTOR_SEARCH_PAGE);

    InstructorSearchPage searchPage = loginToPage(searchPageUrl, InstructorSearchPage.class, instructorId);

    ______TS("cannot click search button if no search term is entered");

    searchPage.search("");

    ______TS("search with no result");

    searchPage.search("thiswillnothitanything");
    searchPage.verifyStatusMessage("No results found.");

    ______TS("search for students");

    searchPage.search("student2");

    CourseAttributes course1 = testData.courses.get("typicalCourse1");
    CourseAttributes course2 = testData.courses.get("typicalCourse2");

    StudentAttributes[] studentsInCourse1 = {
            testData.students.get("student2.2InCourse1"),
            testData.students.get("student2InCourse1"),
    };
    StudentAttributes[] studentsInCourse2 = {
            testData.students.get("student2.2InCourse2"),
            testData.students.get("student2InCourse2"),
    };

    Map<String, StudentAttributes[]> courseIdToStudents = new HashMap<>();
    courseIdToStudents.put(course1.getId(), studentsInCourse1);
    courseIdToStudents.put(course2.getId(), studentsInCourse2);

    Map<String, CourseAttributes> courseIdToCourse = new HashMap<>();
    courseIdToCourse.put(course1.getId(), course1);
    courseIdToCourse.put(course2.getId(), course2);

    searchPage.verifyStudentDetails(courseIdToCourse, courseIdToStudents);

    ______TS("link: view student details page");

    StudentAttributes studentToView = testData.students.get("student2.2InCourse1");

    Page newPage = context.waitForPage(() -> {
      searchPage.clickViewStudent(course1, studentToView);
    });
    InstructorCourseStudentDetailsViewPage viewStudentPage = new InstructorCourseStudentDetailsViewPage(newPage);
    viewStudentPage.verifyIsCorrectPage(course1, studentToView);
    newPage.close();

    ______TS("link: edit student details page");
    newPage = context.waitForPage(() -> {
      searchPage.clickEditStudent(course1, studentToView);
    });
    InstructorCourseStudentDetailsEditPage editStudentPage = new InstructorCourseStudentDetailsEditPage(newPage);
    editStudentPage.verifyIsCorrectPage(course1, studentToView);
    newPage.close();

    ______TS("link: view all records page");
    newPage = context.waitForPage(() -> {
      searchPage.clickViewAllRecords(course1, studentToView);
    });
    InstructorStudentRecordsPage studentRecordsPage = new InstructorStudentRecordsPage(newPage);
    studentRecordsPage.verifyIsCorrectPage(course1.getId(), studentToView.getName());
    newPage.close();

    ______TS("action: delete student");

    StudentAttributes studentToDelete = testData.students.get("student2InCourse2");

    searchPage.clickDeleteStudent(course2, studentToDelete);

    StudentAttributes[] studentsAfterDelete = {
            testData.students.get("student2.2InCourse2"),
    };

    searchPage.verifyStudentDetailsForCourse(course2, studentsAfterDelete);
    verifyAbsentInDatabase(studentToDelete);
  }
  
}
