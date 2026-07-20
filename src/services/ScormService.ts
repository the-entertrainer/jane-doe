// src/services/ScormService.ts
import Scorm12API from 'scorm-again/scorm12';

export class ScormService {
  private scormAPI: Scorm12API | null = null;

  public initializeRuntime(): void {
    // Instantiate a sandbox-safe SCORM 1.2 runtime API adapter
    this.scormAPI = new Scorm12API({
      autocommit: true,
      logLevel: 1 // Enables basic warning and error outputs
    });

    // Expose the API globally to match standard LMS launch discovery patterns
    (window as any).API = this.scormAPI;

    // Attach basic listeners to monitor communication changes
    this.scormAPI.on('LMSInitialize', () => {
      console.log('LMS handshake established successfully.');
    });

    this.scormAPI.on('LMSSetValue.*', (element: string, value: string) => {
      console.log(`LMS tracking modified: ${element} -> ${value}`);
    });
  }

  public registerProgress(score: number, status: 'completed' | 'passed' | 'failed' | 'incomplete'): void {
    if (this.scormAPI) {
      // Set the tracking variables defined by the standard SCORM model
      this.scormAPI.LMSSetValue('cmi.core.score.raw', score.toString());
      this.scormAPI.LMSSetValue('cmi.core.lesson_status', status);
      this.scormAPI.LMSCommit(''); // Commit changes
    }
  }
}
