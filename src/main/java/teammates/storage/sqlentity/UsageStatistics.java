package teammates.storage.sqlentity;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Represents a system usage statistics for a specified period of time.
 *
 * <p>Note that "system usage" here is defined as user-facing usages, such as number of entities created
 * and number of actions, as opposed to system resources such as hardware and network.
 */
@Entity
@Table(name = "UsageStatistics")
public class UsageStatistics extends BaseEntity {
    @Id
    @GeneratedValue
    private Integer id;

    @Column(nullable = false)
    private Instant startTime;

    @Column(nullable = false)
    private int timePeriod;
    @Column(nullable = false)
    private int numResponses;
    @Column(nullable = false)
    private int numCourses;
    @Column(nullable = false)
    private int numStudents;
    @Column(nullable = false)
    private int numInstructors;
    @Column(nullable = false)
    private int numAccountRequests;
    @Column(nullable = false)
    private int numEmails;
    @Column(nullable = false)
    private int numSubmissions;

    protected UsageStatistics() {
        // required by Hibernate
    }

    public UsageStatistics(
            Instant startTime, int timePeriod, int numResponses, int numCourses,
            int numStudents, int numInstructors, int numAccountRequests, int numEmails, int numSubmissions) {
        this.startTime = startTime;
        this.timePeriod = timePeriod;
        this.numResponses = numResponses;
        this.numCourses = numCourses;
        this.numStudents = numStudents;
        this.numInstructors = numInstructors;
        this.numAccountRequests = numAccountRequests;
        this.numEmails = numEmails;
        this.numSubmissions = numSubmissions;
    }

    public Integer getId() {
        return id;
    }

    public Instant getStartTime() {
        return startTime;
    }

    public int getTimePeriod() {
        return timePeriod;
    }

    public int getNumResponses() {
        return numResponses;
    }

    public int getNumCourses() {
        return numCourses;
    }

    public int getNumStudents() {
        return numStudents;
    }

    public int getNumInstructors() {
        return numInstructors;
    }

    public int getNumAccountRequests() {
        return numAccountRequests;
    }

    public int getNumEmails() {
        return numEmails;
    }

    public int getNumSubmissions() {
        return numSubmissions;
    }

    @Override
    public boolean equals(Object other) {
        if (other == null) {
            return false;
        } else if (this == other) {
            return true;
        } else if (this.getClass() == other.getClass()) {
            UsageStatistics otherUsageStatistics = (UsageStatistics) other;
            return Objects.equals(this.startTime, otherUsageStatistics.startTime)
                    && Objects.equals(this.timePeriod, otherUsageStatistics.timePeriod);
        } else {
            return false;
        }
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.startTime, this.timePeriod);
    }

    @Override
    public List<String> getInvalidityInfo() {
        return new ArrayList<>();
    }
}
