import { Component } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ISession, IEvent } from '../../../shared';

@Component({
  templateUrl: './event-details.component.html',
  styles: [`
        .container { padding-left: 20px; padding-right: 20px;}
        h3 { margin: 0px; }
    `]
})
export class EventDetailsComponent {
  event: IEvent;
  addMode: boolean;
  filterBy: string = 'all';
  sortBy: string = 'votes';

  constructor(private eventService: EventService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.forEach((param: Params) => {
      this.event = this.eventService.getEvent(+param['id']);
      this.addMode = false;
      this.filterBy = 'all';
      this.sortBy = 'votes';
    });
  }

  addSession() {
    this.addMode = true;
  }

  saveNewSession(session: ISession) {
    const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
    session.id = nextId + 1;
    this.event.sessions.push(session);
    this.eventService.updateEvent(this.event);
    this.addMode = false;
  }

  cancelNewSession() {
    this.addMode = false;
  }

}
