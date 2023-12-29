
import React from 'react';


interface WritingShowPageProps {
    projectId: string;
}

function WritingShowPage({ projectId }: WritingShowPageProps): JSX.Element {
    // Your component logic goes here
    return (
        <div>
            <h1>Writing Show Page</h1>
            <p>Project ID: {projectId}</p>
            {/* Additional content */}
        </div>
    );
}

export default WritingShowPage;
