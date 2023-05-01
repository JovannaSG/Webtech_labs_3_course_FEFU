function drawGraphic(a, b) {
    if (isNaN(parseFloat(a)) || !isFinite(a)) {
        alert("a должно быть вещественным числом");
        return;
    }
    if (isNaN(parseFloat(b)) || !isFinite(b)) {
        alert("b должно быть вещественным числом");
        return;
    }

    let yAxisLength;
    let xAxisLength;
    let height = 450, 
        width = 450, 
        margin = 30,
        data = [];
        
    // создание объекта svg
    let svg = d3.select(".graphic")
                .append("svg")
                .attr("class", "axis")
                .attr("width", width)
                .attr("height", height);
    
    // длина оси X= ширина контейнера svg - отступ слева и справа
    xAxisLength = width - 2 * margin;     
    // длина оси Y = высота контейнера svg - отступ сверху и снизу
    yAxisLength = height - 2 * margin;

    let arr_x = []
    let arr_y = []
    for (let i = a; i <= b; i++) {
        arr_x.push(i);
        let y = Math.round(((i - 3) / (i ** 2 - 25)) * 100) / 100;
        arr_y.push(y)
    }

    let rawData = [];
    for (let i = 0; i < arr_x.length; i++) {
        if (!isFinite(arr_y[i])) {
            rawData.push({x: arr_x[i], y: yAxisLength});
        } else { 
            rawData.push({x: arr_x[i], y: arr_y[i]});
        }
    }
    console.log(rawData);
        
    // функция интерполяции значений на ось Х  
    let scaleX = d3.scale.linear()
                        .domain([a, b])
                        .range([0, xAxisLength]);
                
    // функция интерполяции значений на ось Y
    let scaleY = d3.scale.linear()
                        .domain([10, -10])
                        .range([0, yAxisLength]);

    // масштабирование реальных данных в данные для нашей координатной системы
    for (let i = 0; i < rawData.length; i++) {
        data.push({
            x: scaleX(rawData[i].x)+margin, 
            y: scaleY(rawData[i].y) + margin
        });
    }
    // создаем ось X   
    let xAxis = d3.svg.axis()
                    .scale(scaleX)
                    .orient("bottom");
    // создаем ось Y             
    let yAxis = d3.svg.axis()
                    .scale(scaleY)
                    .orient("left");
                
    // отрисовка оси Х             
    svg.append("g")       
        .attr("class", "x-axis")
        .attr("transform",  // сдвиг оси вниз и вправо
            "translate(" + margin + "," + (height - margin) + ")")
        .call(xAxis);
    
    // отрисовка оси Y 
    svg.append("g")       
        .attr("class", "y-axis")
        .attr("transform", // сдвиг оси вниз и вправо на margin
                "translate(" + margin + "," + margin + ")")
        .call(yAxis);
    
    // создаем набор вертикальных линий для сетки   
    d3.selectAll("g.x-axis g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", - (yAxisLength));
        
    // рисуем горизонтальные линии координатной сетки
    d3.selectAll("g.y-axis g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", xAxisLength)
        .attr("y2", 0);
    
    // функция, создающая по массиву точек линии
    let line = d3.svg.line()
                    .x(function(d) {return d.x;})
                    .y(function(d) {return d.y;});
    // добавляем путь
    svg.append("g")
        .append("path")
        .attr("d", line(data))
        .style("stroke", "steelblue")
        .style("stroke-width", 2);
}