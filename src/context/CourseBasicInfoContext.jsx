import { createContext, useContext, useEffect, useState } from "react";

import { useBasicsInfoCourse } from "../features/course/useBasicsInfoCourse";
import { useCategories } from "../features/course/useCategories";
import Spinner from "../ui/Spinner";
import { useUpdateBasicsInfo } from "../features/course/useUpdateBasicsInfo";

const CourseBasicInfoContext = createContext();
function CourseBasicInfoProvider({ children }) {
    const { isLoading, course } = useBasicsInfoCourse()

    const [courseState, setCourseState] = useState()
    const { isLoading: loadingCategory, categories } = useCategories()
    const { isPending, updateBasicsInfor } = useUpdateBasicsInfo()
    useEffect(() => {
        if (!isLoading) {
            setCourseState(course)
        }
    }, [course, isLoading])
    if (isLoading || loadingCategory || isPending) return <Spinner />

    function handleOnChangeValue(value) {

        setCourseState(prev => ({ ...prev, ...value }))
    }
    function handleOnUpdate() {
        const { name, price, description, level, category } = courseState
        updateBasicsInfor({ name, price, description, level, category: category.id })
    }

    return (
        <CourseBasicInfoContext.Provider
            value={{
                "course": courseState,
                categories,
                handleOnChangeValue,
                handleOnUpdate,
                updateBasicsInfor,
                isPending
            }}
        >
            {children}
        </CourseBasicInfoContext.Provider>
    );
}
function useCourseBasicInforContext() {
    const context = useContext(CourseBasicInfoContext);
    if (context === undefined)
        throw new Error("CourseBasicInfoContext was used outside AuthProvider");
    return context;
}

export { CourseBasicInfoProvider, useCourseBasicInforContext };