interface TestRequest {
    latitude: string;
    longitude: string;
}

interface TestResponse {
    status: "success";
    elevation: number;
    generationtime_ms: string;
    timezone: string;
    timezone_abbreviation: string;
    utc_offset_seconds: number
}