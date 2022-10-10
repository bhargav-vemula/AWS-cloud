import json 
import boto3,os
from boto3.dynamodb.conditions import Key
def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table_name = os.environ.get('ORDERS_TABLE')
    table = dynamodb.Table(table_name)
    order_id = int(event['pathParameters']['id'])
    activity = json.loads(event['body'])
    # table.query(KeyConditionExpression = Key('id').eq(order_id))
    params = {
        'id': order_id
    }
    table.update_item(
        Key=params,
        UpdateExpression=  "set itemName = :s, quantity = :n",
        ExpressionAttributeValues={
            ":s": activity["itemName"],
            ":n": activity["quantity"],
          
        },
        ReturnValues="UPDATED_NEW"
    )
    return {
        'statusCode': 200,
        'headers': {"Access-Control-Allow-Headers" : 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*'},
        'body': json.dumps({'msg': 'Item Updated'})
    }
