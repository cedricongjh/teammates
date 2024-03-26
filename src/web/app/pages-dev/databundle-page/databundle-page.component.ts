import { Component, OnChanges, OnInit } from '@angular/core';
import { SimulationLinkDatum, SimulationNodeDatum, forceCenter, forceLink, forceManyBody, forceSimulation, select } from 'd3';

@Component({
  selector: 'tm-databundle-page',
  templateUrl: './databundle-page.component.html',
  styleUrls: ['./databundle-page.component.scss']
})
export class DatabundlePageComponent implements OnInit, OnChanges {

  ngOnInit(): void {
    const data: {
    courses: { [key: string]: { name: string } };
    feedbackSessions: { [key: string]: { name: string, courseId: string } };
  } = {
      "courses": {
        "CS2104": {
          "name": "Programming Language Concepts"
        },
        "CS1101": {
          "name": "Programming Methodology"
        },
        "CS4215": {
          "name": "Programming Language Implementation"
        },
        "CS4221": {
          "name": "Database Design"
        }
      },
      "feedbackSessions": {
        "CS2104Feedback": {
          "name": "Feedback Session for Programming Language Concepts",
          "courseId": "CS2104"
        },
        "CS2104Feedback2": {
          "name": "Feedback Session for Programming Language Concepts 2",
          "courseId": "CS2104"
        },
        "CS1101Feedback": {
          "name": "Feedback Session for Programming Methodology",
          "courseId": "CS1101"
        },
        "CS4215Feedback": {
          "name": "Feedback Session for Programming Language Implementation",
          "courseId": "CS4215"
        },
        "CS4221Feedback": {
          "name": "Feedback Session for Database Design",
          "courseId": "CS4221"
        }
      }
    };

  interface Node extends SimulationNodeDatum {
    index: number;
    name: string;
    id: string;
    type: string;
    relationId?: string;
  }

  interface Link extends SimulationLinkDatum<Node> {

  }

  // Extract nodes and links from the JSON data
  const nodes: Node[] = Object.keys(data.courses).map((courseId, index) => ({
    id: courseId,
    name: data.courses[courseId].name,
    type: 'course',
    index: index,
  }));

  const sessions: Node[] = Object.keys(data.feedbackSessions).map((sessionId, index) => ({
    id: sessionId,
    name: data.feedbackSessions[sessionId].name,
    relationId: data.feedbackSessions[sessionId].courseId,
    type: 'session',
    index: index,
  }));

  const allNodes = [...nodes, ...sessions];

  const links: Link[] = sessions.map(session => ({
    source: session,
    target: nodes.find(course => course.id === session.relationId)!
  }));

  // Set up the SVG container
  const svg = select("figure#graph").append('svg')
    .attr('width', "100vw")
    .attr('height', "100vh");

  // Set up the simulation
  const simulation = forceSimulation(allNodes)
    .force('link', forceLink(links).id((d: any) => d.id))
    .force('charge', forceManyBody().strength(-100))
    .force('center', forceCenter(400, 300));

  // Draw links
  const link = svg.selectAll('line')
    .data(links)
    .enter().append('line')
    .style('stroke', '#999')
    .style('stroke-opacity', 0.6)
    .attr('stroke-width', 2);

  // Draw nodes
  const node = svg.selectAll('.node')
    .data(allNodes)
    .enter().append('g')
    .attr('class', 'node')

  node.append('circle')
    .attr('r', 8)
    .style('fill', d => d.type === 'course' ? 'blue' : 'red');

  node.append('text')
    .attr('x', 12)
    .attr('dy', '.5em')
    .text(d => d.name);
  
  node.on("click", function() {
    let textShowing = false;
    if (textShowing) {
      node.select("text").style("visibility", "hidden");
    } else {
      node.select("text").style("visibility", "visible");
    }
      textShowing = !textShowing;
    });

  // Update positions
  simulation.on('tick', () => {
    link
      .attr('x1', d => (d.source as any).x)
      .attr('y1', d => (d.source as any).y)
      .attr('x2', d => (d.target as any).x)
      .attr('y2', d => (d.target as any).y);
    node.attr('transform', d => `translate(${(d as any).x},${(d as any).y})`);
  });

  // Drag behavior
  // function dragstarted(event: { active: any; subject: { fx: any; x: any; fy: any; y: any; }; }) {
  //   if (!event.active) simulation.alphaTarget(0.3).restart();
  //   event.subject.fx = event.subject.x;
  //   event.subject.fy = event.subject.y;
  // }

  // function dragged(event: { subject: { fx: any; fy: any; }; x: any; y: any; }) {
  //   event.subject.fx = event.x;
  //   event.subject.fy = event.y;
  // }

  // function dragended(event: { active: any; subject: { fx: null; fy: null; }; }) {
  //   if (!event.active) simulation.alphaTarget(0);
  //   event.subject.fx = null;
  //   event.subject.fy = null;
  // }

  }

  ngOnChanges(): void {
      
  }
}
