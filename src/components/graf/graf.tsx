import ForceGraph2D from 'react-force-graph-2d';
import React, { useMemo, useState, useCallback } from 'react';
import PopUp from '../popUp/pop_up'
import { color } from 'd3';

interface Data {
    nodes: any[]
    links: any[]
}
export default function Graf({ dataInput, dataStation }: any) {
    const [popUp, setPopUp] = useState(false);
    const [popUpData, setPopData] = useState();

    const NODE_R = 8;
    const HighlightGraph = () => {
        const data = useMemo(() => {
            const myData: Data = {
                "nodes": [
                ],
                "links": [
                ]
            }

            if (dataInput) {
                dataInput.map((el: any, source: any) => {
                    el.map((link: any, column: any) => {
                        if (link === '1') {
                            dataInput.map((element: any, target: any) => element[column] === "-1" ?
                                myData.links.push({
                                    "source": source,
                                    "target": target,
                                })
                                : null)
                        }
                    }
                    )
                    myData.nodes.push({
                        "id": source,
                        "icon": `<i className="fa-solid fa-arrow-down" />`,
                        "neighbors": [],
                    })
                })
            }
            myData.links.forEach((link: any) => {
                const a = myData.nodes[link.source];
                const b = myData.nodes[link.target];
                !a.neighbors && (a.neighbors = []);
                !b.neighbors && (b.neighbors = []);
                a.neighbors.push(b);
                b.neighbors.push(a);

                !a.links && (a.links = []);
                !b.links && (b.links = []);
                a.links.push(link);
                b.links.push(link);
            });

            return myData;
        }, []);

        const colors: any[] = [
            { name: "OCZYSZCZALNIA", color: "#395B64" },
            { name: "ŹRÓDŁO", color: "#371B58" },
            { name: "STACJA", color: "#282A3A" }
        ]


        const [highlightNodes, setHighlightNodes] = useState(new Set());
        const [highlightLinks, setHighlightLinks] = useState(new Set());
        const [hoverNode, setHoverNode] = useState(null);

        const updateHighlight = () => {
            setHighlightNodes(highlightNodes);
            setHighlightLinks(highlightLinks);
        };

        const handleNodeHover = (node: any) => {
            highlightNodes.clear();
            highlightLinks.clear();
            if (node) {
                highlightNodes.add(node);
                node.neighbors.forEach((neighbor: any) => highlightNodes.add(neighbor));
                node.links.forEach((link: any) => highlightLinks.add(link));
            }

            setHoverNode(node || null);
            updateHighlight();
        };

        const handleLinkHover = (link: any) => {
            highlightNodes.clear();
            highlightLinks.clear();

            if (link) {
                highlightLinks.add(link);
                highlightNodes.add(link.source);
                highlightNodes.add(link.target);
            }

            updateHighlight();
        };

        const paintRing = useCallback((node: any, ctx: any) => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, NODE_R * 1.1, 0, 2 * Math.PI, false);
            ctx.fillStyle = node === hoverNode ? '#82CD47' : '#D61C4E';
            ctx.fill();

        }, [hoverNode]);


        const SetNodeColor = (node: any) => {
            const color: any = (colors.filter((item: any) => item.name === dataStation[node.id + 1][1]))
            return color[0].color
        }

        return <ForceGraph2D
            graphData={data}
            nodeRelSize={NODE_R}
            nodeLabel={(node: any) => `${dataStation[node.id + 1][0]}`}
            nodeColor={SetNodeColor}
            autoPauseRedraw={false}
            linkWidth={link => highlightLinks.has(link) ? 5 : 1}
            linkDirectionalParticles={3}
            linkDirectionalParticleWidth={link => highlightLinks.has(link) ? 4 : 0}
            nodeCanvasObjectMode={(node): any => highlightNodes.has(node) ? 'before' : undefined}
            nodeCanvasObject={paintRing}
            linkDirectionalArrowLength={3.5}
            linkDirectionalArrowRelPos={1}
            onNodeHover={handleNodeHover}
            onLinkHover={handleLinkHover}
            linkColor={() => "#D8D8D8"}
            onNodeClick={(node: any) => { setPopUp(true); setPopData(node) }}
            linkDirectionalArrowColor={() => "#D8D8D8"}
            linkDirectionalParticleColor={() => "#3F0071"}
            width={1200}
            maxZoom={5}
            minZoom={1}
            linkLabel={(link: any) => `${dataStation[link.source?.id + 1][0]} > ${dataStation[link.target?.id + 1][0]}`}
        />;
    };
    return (
        <>
            <HighlightGraph />
            {popUp ? <PopUp setPopUp={setPopUp} data={popUpData} dataStation={dataStation} /> : <></>}

        </>
    )

}