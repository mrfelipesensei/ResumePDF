from flask import Flask, request, send_file
from flask_cors import CORS
from reportlab.pdfgen import canvas
from io import BytesIO

app = Flask(__name__)
CORS(app)

@app.route('/gerar-curriculo',methods=['POST'])
def gerar_curriculo():
    dados = request.get_json()

    buffer = BytesIO
    pdf = canvas.Canvas(buffer)

    #Dados pessoais
    y = 800
    pdf.setFont("Helvetiva-Bold", 14)
    pdf.drawAlignedString(50, y, "Currúclo")
    y -= 30

    pdf.setFont("Helvetiva-Bold", 12)
    personal = dados.get('personalData', {})
    pdf.drawString(50, y, f"Nome: {personal.get('nome', '')}")
    y -= 20
    pdf.drawString(50, y, f"E-mail: {personal.get('email', '')}")
    y -= 20
    pdf.drawString(50, y, f"Telefone: {personal.get('telefone', '')}")
    y -= 20
    pdf.drawString(50, y, f"Endereço: {personal.get('nome', '')}")
    y -= 30

    #Formação
    pdf.setFont("Helvetiva-Bold", 12)
    pdf.drawString(50, y, "Formação Acadêmica:")
    y -= 20
    pdf.setFont("Helvetica",11)
    for edu in dados.get('educations',[]):
        pdf.drawString(60, y, f"{edu.get('curso')} - {edu.get('instituicao')} ({edu.get('conclusao')})")
        y -= 20

    y-= 10
    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(50, y, "Experiência Profisisonal:")
    y -= 20
    pdf.setFont("Helvetica", 11)
    for exp in dados.get('experiences',[]):
        pdf.drawString(60, y, f"{exp.get('cargo')} na {exp.get('empresa')} ({exp.get('periodo')})")
        y -= 15
        pdf.drawString(70, y, f"{exp.get('descricao')}")
        y -= 30

    pdf.showPage()
    pdf.save()

    buffer.seek(0)
    return send_file(buffer, as_attachment=True, download_name='curriculo.pdf', mimetype='application/pdf')

if __name__ == '__main__':
    app.run(debug=True)