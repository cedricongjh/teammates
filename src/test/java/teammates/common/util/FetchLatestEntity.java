package teammates.common.util;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.function.Supplier;

public class FetchLatestEntity {
    
    public static <T> T fetchLatestEntities(Supplier<T> fetchEntities) {
        ofy().clear();
        return fetchEntities.get();
    }

}
